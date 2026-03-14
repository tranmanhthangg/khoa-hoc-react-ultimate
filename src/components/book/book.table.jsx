import { Table } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const BookTable = ({ dataBook, loadBook, current, pageSize, total, setCurrent, setPageSize }) => {

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            render: (_, record, index) => (
                <>
                    {(index + 1) + (current - 1) * pageSize}
                </>
            )
        },
        {
            title: 'ID',
            dataIndex: '_id',
        },
        {
            title: 'Title',
            dataIndex: 'mainText',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            render: (_, record) => (
                <>
                    {`${record.price} ₫`}
                </>
            )
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
        },
        {
            title: 'Author',
            dataIndex: 'author',
        },
        {
            title: "Action",
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }} />
                    <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                </div>
            )
        }
    ];

    const onChange = (pagination) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) // "5" -> 5 đảm bảo so sánh số, tránh lỗi
            }
        }
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };

    return (
        <Table
            dataSource={dataBook}
            columns={columns}
            rowKey={"_id"}
            pagination={
                {
                    current: current,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: total,
                    showTotal: (total, range) => (<div>{range[0]} - {range[1]} on {total} rows</div>)
                }}
            onChange={onChange}
        />
    );
}

export default BookTable;