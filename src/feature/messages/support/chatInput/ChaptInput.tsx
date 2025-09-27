/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Input, Button, Image } from "antd";
import { SendOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useSearchParams } from "next/navigation";
import useAuthUser from "@/hooks/useGetMe";

const { TextArea } = Input;

type Props = {
  sendMessage: (senderId: string, receiverId: string, content: string, callback: (response: any) => void) => void;
};

const ChatInput : React.FC<Props> = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("user") || ""
  const senderId = useAuthUser()?.user?.id
  // console.log(senderId, receiverId);

  const handleSendMessage = () => {
    if (message.trim() !== "" || images.length > 0) {

      sendMessage(senderId, receiverId, message, (response) => {
        if (response.status === "success") {
          setMessage("");
          // setTyping(chatId, false);
        }
      });
      setImages([]); // Clear images after sending
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // const handleImageUpload = (file: File) => {
  //   setImages([...images, file]);
  //   return false; // Prevent auto-upload
  // };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col mt-3 p-2 rounded-lg border border-gray-200 w-full ">
      {/* Image List Preview */}
      {images.length > 0 && (
        <div className="flex gap-2 pt-2 mb-2 overflow-x-auto">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt="uploaded"
                width={50}
                height={50}
                className="rounded-md"
              />
              <CloseCircleOutlined
                className="absolute -top-2 -right-2 text-red-500 cursor-pointer"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Input Section */}
      <div className="flex items-center">
        {/* Image Upload Button */}
        {/* <Upload multiple={true} showUploadList={false} beforeUpload={handleImageUpload}>
          <Button type="primary" shape="circle" icon={<PlusOutlined />} className="text-white mr-2" />
        </Upload> */}

        {/* Text Area with Auto Height */}
        <TextArea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onPressEnter={handleKeyPress}
          autoSize={{ minRows: 1, maxRows: 5 }}
          className="flex-1 bg-gray-100 text-black border-none focus:ring-0 resize-none hover:bg-gray-200"
        />

        {/* Send Button */}
        <Button type="primary" icon={<SendOutlined />} onClick={handleSendMessage} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
