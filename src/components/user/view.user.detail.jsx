import { Drawer, Button } from "antd";
import { useState } from "react";

const ViewUserDetail = ({ isOpenDetail, setIsOpendetail, dataDetail, setDataDetail }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setSelectedFile(null);
            setPreview(null);
            return;
        }
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
        }
    }

    console.log("checkk file:", preview)

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
                        <div style={{
                            margin: "20px auto",
                            height: "180px",
                            width: "180px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataDetail.avatar}`} />
                        </div>
                        <div>
                            <label htmlFor="btn-upload-avatar" style={{
                                display: "block",
                                width: "fit-content",
                                margin: "0 auto",
                                padding: "4px 8px",
                                background: "orange",
                                borderRadius: "5px",
                                cursor: "pointer"
                            }}>
                                Upload Avatar
                            </label>
                            <input type="file" hidden id="btn-upload-avatar" onChange={handleOnChangeFile} />
                        </div>
                        {preview &&
                            <div style={{
                                margin: "20px auto",
                                height: "180px",
                                width: "180px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview} />
                            </div>
                        }

                    </>
                    :
                    <p>Không có dữ liệu</p>
                }

            </Drawer >
        </>
    );
}

export default ViewUserDetail;