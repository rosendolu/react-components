// Import the `Editor` and `Transforms` helpers from Slate.
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { Editor, Element, Transforms, createEditor } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const initialValue = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
];

export default function App() {
    const [editor] = useState(() => withReact(createEditor()));

    const renderElement = useCallback(props => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                style={{ minHeight: '200px' }}
                renderElement={renderElement}
                onKeyDown={event => {
                    if (event.key === '`' && event.ctrlKey) {
                        // Prevent the "`" from being inserted by default.
                        event.preventDefault();
                        // Otherwise, set the currently selected blocks type to "code".
                        Transforms.setNodes(
                            editor,
                            { type: 'code' },
                            {
                                match: n => {
                                    return Element.isElement(n) && Editor.isBlock(editor, n);
                                },
                            }
                        );
                    }
                }}
            />
        </Slate>
    );
}

const CodeElement = props => {
    return (
        <pre {...props.attributes}>
            <code className={classNames('bg-red-500')}>{props.children}</code>
        </pre>
    );
};

const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>;
};
