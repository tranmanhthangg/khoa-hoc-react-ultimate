import { useEffect, useState } from "react";
import { Modal, Input, InputNumber, Select, notification, Form } from "antd";
import { handleUploadFile, updateBookAPI } from "../../service/api.service";

const BookUpdateUnControl = ({ openBookUpdate, setOpenBookUpdate, dataBookUpdate, setDataBookUpdate, loadBook }) => {
    const [form] = Form.useForm();
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (dataBookUpdate && dataBookUpdate._id) {
            form.setFieldsValue({
                id: dataBookUpdate._id,
                title: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category
            });
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataBookUpdate]);

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
        if (!preview && !selectedFile) {
            notification.error({
                message: "Error update book",
                description: "Please upload thumbnail"
            })
            return;
        }

        let thumbnail = "";

        if (preview && !selectedFile) {
            thumbnail = dataBookUpdate.thumbnail;
        }
        else {
            const resUpload = await handleUploadFile(selectedFile, "book");
            if (resUpload.data) {
                thumbnail = resUpload.data.fileUploaded;
            }
            else {
                notification.error({
                    message: "Error update book",
                    description: JSON.stringify(resUpload.message)
                })
                return;
            }
        }

        const { id, title, author, price, quantity, category } = values;
        const res = await updateBookAPI(id, thumbnail, title, author, price, quantity, category);
        if (res.data) {
            notification.success({
                message: "Update book",
                description: "Update complete."
            });
            handleCancel();
            await loadBook();
        }
        else {
            notification.error({
                message: "Error update book",
                description: JSON.stringify(res.message)
            });
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setPreview(null);
        setSelectedFile(null);
        setOpenBookUpdate(false);
    };

    return (
        <Modal title="Update Book" okText="UPDATE" maskClosable={false} open={openBookUpdate} onOk={() => { form.submit() }} onCancel={handleCancel} >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleOk}
            >
                <Form.Item
                    label="ID"
                    name="id"
                >
                    <Input disabled />
                </Form.Item>
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
    );
}

export default BookUpdateUnControl;