import { Drawer, Button } from "antd";

const ViewUserDetail = ({ isOpenDetail, setIsOpendetail, dataDetail, setDataDetail }) => {

    return (
        <>
            <Drawer
                width={"30vw"}
                title="User Detail"
                onClose={() => { setIsOpendetail(false); setDataDetail(null) }}
                open={isOpenDetail}
            >
                {dataDetail ?
                    <>
                        <p>ID: {dataDetail._id}</p> <br />
                        <p>Full Name: {dataDetail.fullName}</p> <br />
                        <p>Email: {dataDetail.email}</p> <br />
                        <p>Phone: {dataDetail.phone}</p> <br />
                        <p>Avatar:</p>
                        <div style={{ "marginTop": "20px", "textAlign": "center" }}>
                            <img height={180} width={180} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                        </div>
                        <div>
                            <label htmlFor="btn-upload-avatar" style={{
                                "display": "block",
                                "width": "fit-content",
                                "margin": "0 auto",
                                "padding": "4px 8px",
                                "background": "orange",
                                "borderRadius": "5px",
                                "cursor": "pointer"
                            }}>
                                Upload Avatar
                            </label>
                            <input type="file" hidden id="btn-upload-avatar" />
                        </div>

                    </>
                    :
                    <p>Không có dữ liệu</p>
                }

            </Drawer >
        </>
    );
}

export default ViewUserDetail;