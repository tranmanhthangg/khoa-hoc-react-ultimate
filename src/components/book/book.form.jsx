import { Button, Modal, Input, InputNumber, Select, notification } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../service/api.service";

const BookForm = ({ loadBook }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    const handleUploadThumbnail = (event) => {
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

    const handleOk = async () => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload thumbnail"
            })
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const thumbnail = resUpload.data.fileUploaded;
            const res = await createBookAPI(thumbnail, title, author, price, quantity, category);
            if (res.data) {
                notification.success({
                    message: "Create book",
                    description: "Create complete."
                });
                handleCancel();
                await loadBook();
            }
            else {
                notification.error({
                    message: "Error create book",
                    description: JSON.stringify(res.message)
                });
            }
        }
    };

    const handleCancel = () => {
        setTitle("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        setSelectedFile(null);
        setPreview(null);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="book-form" style={{ margin: "0 0 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>Table Book</h3>
                    <Button type="primary" onClick={() => { setIsModalOpen(true) }}>Create Book</Button>
                </div>
            </div >
            <Modal title="Create Book" okText="CREATE" maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <div>
                        <span>Title:</span>
                        <Input value={title} onChange={(event) => { setTitle(event.target.value) }} />
                    </div>
                    <div>
                        <span>Author:</span>
                        <Input value={author} onChange={(event) => { setAuthor(event.target.value) }} />
                    </div>
                    <div>
                        <span>Price:</span>
                        <InputNumber style={{ width: "100%" }} addonAfter={"₫"} value={price} onChange={((value) => { setPrice(value) })} />
                    </div>
                    <div>
                        <span>Quantity:</span>
                        <InputNumber style={{ width: "100%" }} value={quantity} onChange={(value) => { setQuantity(value) }} />
                    </div>
                    <div>
                        <span>Category:</span>
                        <Select
                            style={{ width: "100%" }}
                            value={category}
                            showSearch={{ optionFilterProp: 'label' }}
                            placeholder="Select a category"
                            onChange={(value) => { setCategory(value) }}
                            options={[
                                { value: 'Arts', label: 'Arts' },
                                { value: 'Business', label: 'Business' },
                                { value: 'Comics', label: 'Comics' },
                                { value: 'Cooking', label: 'Cooking' },
                                { value: 'Entertainment', label: 'Entertainment' },
                                { value: 'History', label: 'History' },
                                { value: 'Music', label: 'Music' },
                                { value: 'Sports', label: 'Sports' },
                                { value: 'Teen', label: 'Teen' },
                                { value: 'Travel', label: 'Travel' },
                            ]}
                        />
                    </div>
                    <div>
                        <span>Thumbnail:</span>
                        <label htmlFor="btn-upload-avatar" style={{
                            display: "block",
                            marginTop: "10px",
                            width: "fit-content",
                            padding: "4px 8px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>
                            Upload
                        </label>
                        <input type="file" hidden id="btn-upload-avatar"
                            onChange={handleUploadThumbnail}
                            onClick={(event) => event.target.value = null}
                        />
                        {preview &&
                            <div style={{
                                marginTop: "10px",
                                height: "120px",
                                width: "120px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview} />
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default BookForm;