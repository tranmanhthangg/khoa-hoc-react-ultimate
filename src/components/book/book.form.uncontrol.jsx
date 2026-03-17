import { Button, Modal, Input, InputNumber, Select, notification, Form } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFile } from "../../service/api.service";

const BookFormUnControl = ({ loadBook }) => {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const handleOk = async (values) => {
        if (!selectedFile) {
            notification.error({
                message: "Error create book",
                description: "Please upload thumbnail"
            })
            return;
        }
        const resUpload = await handleUploadFile(selectedFile, "book");
        if (resUpload.data) {
            const { title, author, price, quantity, category } = values;
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
        form.resetFields();
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
            <Modal title="Create Book" okText="CREATE" maskClosable={false} open={isModalOpen} onOk={() => { form.submit() }} onCancel={(handleCancel)}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleOk}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[{ required: true, message: 'Please input title!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Author"
                        name="author"
                        rules={[{ required: true, message: 'Please input author!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} addonAfter={"₫"} />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                        rules={[{ required: true, message: 'Please input quantity!' }]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please input category!' }]}
                    >
                        <Select
                            style={{ width: "100%" }}
                            showSearch={{ optionFilterProp: 'label' }}
                            placeholder="Select a category"
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
                    </Form.Item>
                </Form>
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
                        onClick={(even) => even.target.value = null}
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
            </Modal >
        </>
    );
}

export default BookFormUnControl;