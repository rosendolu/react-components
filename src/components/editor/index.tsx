import { Button, Space } from 'antd';
import log from 'loglevel';
import { useCallback, useRef, useState } from 'react';
// Import the Slate components and React plugin.
import { nanoid } from '@reduxjs/toolkit';
import { default as classNames, default as classnames } from 'classnames';
import { Editor, Element, Transforms, createEditor } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';
import { useEffectOnce } from 'usehooks-ts';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: '111' }],
    },
    {
        type: 'paragraph',
        children: [{ text: '222' }],
    },
    {
        type: 'paragraph',
        children: [{ text: '333' }],
    },
    {
        type: 'paragraph',
        children: [{ text: '444' }],
    },
];

function RichTextEditor() {
    const [editor] = useState(() => withReact(createEditor()));
    useEffectOnce(() => {
        globalThis.editor = editor;
    });

    function onchange(val) {
        // log.debug('change', val);
    }
    function onValueChange(value) {
        log.debug('valueChange', value);
    }
    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.
    const renderElement = useCallback(props => {
        // log.debug('element props', props.element.type);
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            case 'pause':
                return <PauseElement {...props} />;
            case 'inlineBlock':
                return <InlineBlock {...props}></InlineBlock>;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    // Define a leaf rendering function that is memoized with `useCallback`.
    const renderLeaf = useCallback(props => {
        return <Leaf {...props} />;
    }, []);

    function moveCursorToEnd() {
        const path = [1, 0]; // Example: Move cursor to the start of the first text node in the first paragraph
        Transforms.select(editor, Editor.end(editor, path));
        ReactEditor.focus(editor);
    }

    function moveCursorToStart() {
        const path = [1, 0]; // Example: Move cursor to the start of the first text node in the first paragraph
        Transforms.select(editor, Editor.start(editor, path));
        ReactEditor.focus(editor);
    }
    const selectionRef = useRef<any>(null);
    // 保存光标位置
    const saveCursorPosition = e => {
        const { selection } = editor;
        selectionRef.current = selection;
        ReactEditor.focus(editor);
    };

    // 恢复光标位置
    const restoreCursorPosition = e => {
        const savedSelection = selectionRef.current;
        if (savedSelection) {
            Transforms.setSelection(editor, savedSelection);
        }
        ReactEditor.focus(editor);
    };

    function insertPause(e) {
        Transforms.insertNodes(
            editor,
            {
                type: 'pause',
                children: [
                    {
                        text: 'pause block',
                        // @ts-ignore
                        uid: nanoid(),
                        type: 'pause',
                    },
                ],
            }
            //   { at: Editor.end(editor, []) }
        );
        // insertInlineBlock(e);
        Editor.addMark(editor, 'bold', true);
        ReactEditor.focus(editor);
    }
    function insertInlineBlock(e) {
        Transforms.insertNodes(
            editor,
            {
                type: 'inlineBlock',
                children: [
                    {
                        text: '',
                        // @ts-ignore
                        uid: nanoid(),
                    },
                ],
            }
            //   { at: Editor.end(editor, []) }
        );
        ReactEditor.focus(editor);
    }
    function togglePause(e) {
        Transforms.setNodes(
            editor,
            // @ts-ignore
            { type: 'pause' },
            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
        );
    }

    function insertText(event) {
        editor.insertText('TEXT');
    }

    function setNode(event) {
        // Determine whether any of the currently selected blocks are code blocks.
        const [match] = Editor.nodes(editor, {
            // @ts-ignore
            match: n => n.type === 'code',
        });

        Transforms.setNodes(
            editor,
            { type: match ? 'paragraph' : 'code', children: [{ text: 'SET TEXT' }] },
            {
                match: n => {
                    return Element.isElement(n) && Editor.isBlock(editor, n);
                },
            }
        );
    }

    function addMark(event): void {
        Editor.addMark(editor, 'bold', {
            bold: true,
            uid: nanoid(),
        });
    }

    return (
        <div className="min-h-[300px] p-4">
            <div className="">
                <Space direction="horizontal" wrap>
                    <Button onClick={moveCursorToStart}>Move Cursor to Start</Button>
                    <Button onClick={moveCursorToEnd}>Move Cursor to End</Button>
                    <Button onClick={saveCursorPosition}>Save Cursor Position</Button>
                    <Button onClick={restoreCursorPosition}>Restore Cursor Position</Button>
                    <Button onClick={insertPause}>Insert Pause</Button>
                    <Button onClick={insertInlineBlock}>Insert InlineBlock</Button>

                    <Button onClick={setNode}>setNode</Button>
                    <Button onClick={insertText}>Insert text</Button>
                    <Button onClick={addMark}>addMark</Button>
                </Space>
            </div>
            <Slate editor={editor} initialValue={initialValue} onChange={onchange} onValueChange={onValueChange}>
                <Editable
                    className="my-4 min-h-[300px] p-4 outline-dashed outline-1 outline-red-700"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (!event.ctrlKey) {
                            return;
                        }
                        log.debug('onKeyDown', event.key);
                        switch (event.key) {
                            // When "`" is pressed, keep our existing code block logic.
                            case '`': {
                                event.preventDefault();
                                const [match] = Editor.nodes(editor, {
                                    // @ts-ignore
                                    match: n => n?.type === 'code',
                                });
                                Transforms.setNodes(
                                    editor,
                                    // @ts-ignore
                                    { type: match ? 'paragraph' : 'code' },
                                    // @ts-ignore
                                    { match: n => Editor.isBlock(editor, n) }
                                );
                                break;
                            }

                            // When "B" is pressed, bold the text in the selection.
                            case 'b': {
                                event.preventDefault();
                                Editor.addMark(editor, 'bold', true);
                                break;
                            }
                        }
                    }}
                />
            </Slate>
        </div>
    );
}

export default RichTextEditor;

function CodeElement(props) {
    return (
        <pre {...props.attributes}>
            <code className={classNames('bg-red-500')}>{props.children}</code>
        </pre>
    );
}
// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
function InlineBlock(props) {
    return (
        <div {...props.attributes} className={classnames('inline-block', 'ml-[-4px]')}>
            &ensp;{props.children}
        </div>
    );
}

function DefaultElement(props) {
    return <div {...props.attributes}>{props.children}</div>;
}
function PauseElement(props) {
    function clickPause(e) {
        log.debug('clickPause', e);
        e.preventDefault();
    }

    return (
        <div
            {...props.attributes}
            onClick={clickPause}
            // contentEditable={false}
            className={classnames(
                'mx-1 inline-block cursor-pointer bg-green-500 px-1 outline-dashed outline-1 outline-red-500'
            )}>
            <InlineChromiumBugfix></InlineChromiumBugfix>
            {props.children}
            <InlineChromiumBugfix></InlineChromiumBugfix>
        </div>
    );
}

//
function Leaf(props) {
    log.debug('leaf', props.leaf);
    return (
        <span
            {...props.attributes}
            data-uid={props.leaf?.uid}
            contentEditable={props.leaf?.type == 'pause' ? false : true}
            style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
            {props.children}
        </span>
    );
    //   return props.children;
}

// Put this at the start and end of an inline component to work around this Chromium bug:
// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
function InlineChromiumBugfix() {
    return (
        <span contentEditable={false} style={{ fontSize: 0 }}>
            {String.fromCodePoint(160) /* Non-breaking space */}
        </span>
    );
}
