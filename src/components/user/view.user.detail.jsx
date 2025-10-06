import { Drawer } from "antd";

const ViewUserDetail = ({ isOpenDetail, setIsOpendetail, dataDetail, setDataDetail }) => {

    return (
        <>
            <Drawer
                title="User Detail"
                onClose={() => { setIsOpendetail(false); setDataDetail(null) }}
                open={isOpenDetail}
            >
                {dataDetail ?
                    <>
                        <p>ID: {dataDetail._id}</p> <br />
                        <p>Full Name: {dataDetail.fullName}</p> <br />
                        <p>Email: {dataDetail.email}</p> <br />
                        <p>Phone: {dataDetail.phone}</p>
                    </>
                    :
                    <p>Không có dữ liệu</p>
                }

            </Drawer >
        </>
    );
}

export default ViewUserDetail;