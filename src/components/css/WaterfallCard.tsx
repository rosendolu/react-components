import { Typography } from 'antd';
import classNames from 'classnames';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { list } from './constant';
import Style from './style.module.css';

const arr = list.map(val => `https://cdn.nnkosmos.com/${val.preview}?imageView2/2/w/200/format/webp/interlace/1`);

export default function WaterfallCard() {
    return (
        <>
            <Typography.Title level={1}>Waterfall(Masonry) Layout</Typography.Title>

            <Typography.Title level={2}>Grid Layout</Typography.Title>
            <p className="m-4">
                <Typography.Text mark code>
                    grid-auto-rows: auto 150px auto 200px
                </Typography.Text>
                <Typography.Text>rows 只能固定设置，但是瀑布流需要实现一行不同的 高度 ❌</Typography.Text>
            </p>
            <GridLayout />

            <Typography.Title level={2}>Column Layout</Typography.Title>
            <p className="m-4">
                <Typography.Text mark code>
                    column-count: 4;
                </Typography.Text>
                <Typography.Text>顺序不能保证 从左到右排列 ❌</Typography.Text>
            </p>
            <ColumnLayout />

            <Typography.Title level={2}>Flex Layout</Typography.Title>

            <FlexLayout />
        </>
    );
}

function GridLayout() {
    return (
        <div className={classNames(Style['grid-container'])}>
            {arr.map((url, index) => (
                <div className={classNames(Style['item'])} key={index}>
                    <img src={url}></img>
                    <div className={Style.card}>card {index + 1}</div>
                </div>
            ))}
        </div>
    );
}

function ColumnLayout() {
    return (
        <div className={classNames(Style['columnBox'])}>
            {arr.map((url, index) => (
                <div className={classNames(Style['item'])} key={index}>
                    <img src={url}></img>
                    <div className={Style.card}>card {index + 1}</div>
                </div>
            ))}
        </div>
    );
}

function FlexLayout() {
    const [pos, setPos] = useState(0);
    const maxWidth = useDebounce(pos, 100);
    const anchorContent = useRef(null);

    const renderList = useMemo(() => {
        // 最小 4 列
        const columnCount = Math.max((maxWidth / 180) >> 0, 3);
        return arr.reduce(
            (acc, item, i) => {
                const bucketIndex = i % columnCount;
                acc[bucketIndex].push(item);
                return acc;
            },
            Array.from({ length: columnCount }, v => [] as any[])
        );
    }, [arr, maxWidth]);

    /**
     * resize observer
     */
    useEffect(() => {
        const maxBox = anchorContent.current!;
        // 创建 ResizeObserver 实例并传入回调函数
        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                const { contentRect } = entry;
                const { width, height } = contentRect;
                setPos(width);
            }
        });
        maxBox && observer.observe(maxBox);
        return () => {
            if (observer) {
                observer.unobserve(maxBox);
                observer.disconnect();
            }
        };
    }, []);

    return (
        <div className={classNames(Style['flexBox'])} ref={anchorContent}>
            {renderList.map((list, i) => {
                return (
                    <div className="flex flex-col" key={i}>
                        {list.map((url, index) => (
                            <div className={classNames(Style['item'], 'mb-2')} key={index}>
                                <img src={url}></img>
                                <div className={Style.card}>card {index + 1}</div>
                            </div>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
