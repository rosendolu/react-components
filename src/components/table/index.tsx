import styles from './index.module.css';

const Table = ({ columns, data, fixedHeader = false, fixedColumn = false }) => {
    return (
        <table className={styles.table}>
            <thead className={`${fixedHeader ? styles.stickyHeader : ''}`}>
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            className={`${styles.headerCell} ${fixedColumn && index === 0 ? styles.stickyColumn : ''}`}>
                            {column}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="whitespace-nowrap">
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td
                                key={cellIndex}
                                className={`${styles.cell} ${
                                    fixedColumn && cellIndex === 0 ? styles.stickyColumn : ''
                                }`}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

function XTable() {
    const columns = ['Name', 'Age', 'Occupation', 'Location', 'Company'];
    const data = [
        ['Alice', 24, 'Engineer', 'New York', 'TechCorp'],
        ['Bob', 30, 'Designer', 'San Francisco', 'DesignHub'],
        ['Charlie', 29, 'Teacher', 'Los Angeles', 'SchoolWorks'],
        ['A', 29, 'Teacher', 'Los Angeles', 'SchoolWorks'],
        ['B', 29, 'Teacher', 'Los Angeles', 'SchoolWorks'],
        ['C', 29, 'Teacher', 'Los Angeles', 'SchoolWorks'],
        ['D', 29, 'Teacher', 'Los Angeles', 'SchoolWorks'],
        ['E', 29, 'Teacher', 'Los Angeles', 'SchoolWorks'],
        ['F', 29, 'Teacher', 'Los Angeles', 'SchoolWorksxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'],
        // 更多数据
    ];

    return (
        <div>
            <h1>Table with Fixed Header and Column</h1>
            <Table columns={columns} data={data} fixedHeader={true} fixedColumn={true} />
            {/* <div className="h-[100vh]"></div> */}
        </div>
    );
}

export default XTable;
