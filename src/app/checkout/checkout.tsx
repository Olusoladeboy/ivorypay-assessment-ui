import React from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Skeleton,
  Spin,
  Table,
  notification,
} from "antd";
import axios from "axios";
import {
  TransactionInterface,
  createTransaction,
  retrieveTransactions,
} from "../../api.service";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import usePayStackPayment from "../paystack/usePayStackPayment";
// import { usePaystackPayment } from "react-paystack";

type NotificationType = "success" | "info" | "warning" | "error";

export default function Checkout() {
  const [form] = Form.useForm();
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TransactionInterface | any>();
  const initializePayment = usePayStackPayment();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  const onSuccess = () => createApi();

  const createApi = async () => {
    const result = await createTransaction(form.getFieldsValue());
    openNotificationWithIcon("success", "Successful", "Transaction Created");
    form.resetFields();
    await getTransactions();
    setLoading(false);
  };

  const onClose = () => {
    console.log("closed");
  };

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const columns: ColumnsType<TransactionInterface> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Price (Solana)",
      dataIndex: "price",
      key: "price",
    },
  ];

  const getTransactions = async () => {
    const _transactions: TransactionInterface[] | any =
      await retrieveTransactions();
    setTransactions(_transactions);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const onFinish = async (data: TransactionInterface) => {
    setFormData(data);
    setLoading(true);
    await initializePayment(
      {
        reference: new Date().getTime().toString(),
        email: data.email,
        amount: data.price * 100,
        publicKey: `${process.env.NEXT_PUBLIC_PAYSTACK_KEY}`,
      },
      onSuccess,
      onClose
    );
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-20">
      {contextHolder}
      <div className="border border-white rounded-lg w-full p-10">
        <h1 className="text-xl text-bold text-center mb-12">Checkout</h1>
        <Form
          layout="vertical"
          //   {...layout}
          form={form}
          name="checkout-form"
          onFinish={onFinish}
        >
          <Form.Item
            label={<label className="text-white">Name</label>}
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
            className="text-white"
          >
            <Input name="name" />
          </Form.Item>

          <Form.Item
            label={<label className="text-white">Email</label>}
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input name="email" />
          </Form.Item>

          <Form.Item
            label={<label className="text-white">Item</label>}
            name="item"
            rules={[{ required: true, message: "Please enter the item" }]}
          >
            <Input name="item" />
          </Form.Item>

          <Form.Item
            label={<label className="text-white">Price (Solana)</label>}
            name="price"
            rules={[
              { required: true, message: "Please enter the price" },
              { type: "number", message: "Please enter a valid price" },
            ]}
          >
            <InputNumber name="price" min={1} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item style={{ textAlign: "center", width: "100%" }}>
            <Button disabled={loading} type="primary" htmlType="submit">
              {!loading ? <span>Submit</span> : <Spin />}
            </Button>
          </Form.Item>
          {/* <PaymentButton /> */}
        </Form>
      </div>
      <div className="mt-10">
        <h1 className="text-xl mb-3">Transactions</h1>
        {transactions.length < 1 ? (
          new Array(5).map((skeleton, index) => <Skeleton key={index} />)
        ) : (
          <Table
            columns={columns}
            rowKey={""}
            pagination={{ style: { background: "white" } }}
            dataSource={transactions}
          />
        )}
      </div>
    </section>
  );
}
