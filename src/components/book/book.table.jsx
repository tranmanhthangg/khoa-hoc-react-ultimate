import { Table, Popconfirm, notification, message } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from "react";
import BookDetail from "./view.book.detail";
import BookUpdate from "./book.update";
import BookUpdateUnControl from "./book.update.uncontrol";
import { deleteBookAPI } from "../../service/api.service";

const BookTable = ({ dataBook, loadBook, current, pageSize, total, setCurrent, setPageSize }) => {
    const [openBookDetail, setOpenBookDetail] = useState(false);
    const [dataBookDetail, setDataBookDetail] = useState(null);
    const [openBookUpdate, setOpenBookUpdate] = useState(false);
    const [dataBookUpdate, setDataBookUpdate] = useState(null);

    const handlDeleteBook = async (id) => {
        const res = await deleteBookAPI(id);
        if (res.data) {
            notification.success({
                message: "Delete a book",
                description: "Delete complete."

            });
            await loadBook();
        }
        else {
            notification.error({
                message: "Error delete a book",
                description: JSON.stringify(res.message)
            });
        }
    }

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
            render: (_, record) => (
                <a onClick={() => { setOpenBookDetail(true); setDataBookDetail(record); console.log(record) }}>{record._id}</a>
            )
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
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }} onClick={() => { setOpenBookUpdate(true); setDataBookUpdate(record) }} />
                    <Popconfirm
                        title="Delete the book"
                        description="Are you sure to delete this book?"
                        placement="left"
                        onConfirm={() => handlDeleteBook(record._id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div >
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
        <>
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
            <BookDetail
                openBookDetail={openBookDetail}
                setOpenBookDetail={setOpenBookDetail}
                dataBookDetail={dataBookDetail}
                setDataBookDetail={setDataBookDetail}
                loadBook={loadBook}
            />
            {/* <BookUpdate
                openBookUpdate={openBookUpdate}
                setOpenBookUpdate={setOpenBookUpdate}
                dataBookUpdate={dataBookUpdate}
                setDataBookUpdate={dataBookUpdate}
                loadBook={loadBook}
            /> */}
            <BookUpdateUnControl
                openBookUpdate={openBookUpdate}
                setOpenBookUpdate={setOpenBookUpdate}
                dataBookUpdate={dataBookUpdate}
                setDataBookUpdate={dataBookUpdate}
                loadBook={loadBook}
            />
        </>
    );
}

export default BookTable;