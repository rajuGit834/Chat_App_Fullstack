// import { useState } from "react";
// import { Avatar, Button, Modal, Tooltip } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { updateName } from "../../redux/slices/usersSlice";

// import {
//   EditFilled,
//   CameraOutlined,
//   CheckOutlined,
//   CloseOutlined,
// } from "@ant-design/icons";

// const ViewProfile: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editName, setEditName] = useState<boolean>(true);

//   const dispatch = useDispatch();
//   const users = useSelector((state: RootState) => state.users.users);
//   const selectedUser = useSelector(
//     (state: RootState) => state.users.selectedUser
//   );

//   const user = users.find((user) => user.id === selectedUser);
//   const [contactName, setContactName] = useState<string>(user?.name || "");

//   const handleUpdateName = (): void => {
//     dispatch(updateName({ userId: selectedUser, userName: contactName }));
//     setEditName(!editName);
//   };

//   const handleCancelChange = (): void => {
//     setContactName(user?.name || "");
//     setEditName(!editName);
//   };

//   const showModal = () => {
//     setContactName(user?.name || "");
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setContactName(user?.name || "");
//     setEditName(true);
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Button
//         type="text"
//         onClick={showModal}
//         style={{
//           background: "none",
//         }}
//       >
//         View Profile
//       </Button>
//       <Modal
//         title="Profile"
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <div className="flex flex-col gap-5">
//           <div className="flex justify-center items-center w-[100%]">
//             {user?.profilePic ? (
//               <img
//                 src={user?.profilePic}
//                 alt="profilePic"
//                 className="h-[200px] w-[200px] rounded-full border border-gray-400 bg-cover"
//               />
//             ) : (
//               <Avatar size={200} icon={<UserOutlined />}/>
//             )}
//             <div className="relative h-[200px]">
//               <label className="cursor-pointer absolute bottom-0 right-0">
//                 <input type="file" className="hidden" />
//                 <Tooltip title={"Chnage Image"}>
//                   <CameraOutlined className="text-[20px] p-2 hover:bg-gray-300 rounded-full cursor-pointer" />
//                 </Tooltip>
//               </label>
//             </div>
//           </div>
//           <div className="flex justify-around p-2 rounded-lg bg-gray-100">
//             <div className="w-[50%] flex gap-1">
//               <input
//                 type="text"
//                 value={contactName}
//                 disabled={editName}
//                 className={`outline-none w-[100%]  p-2 font-bold ${
//                   !editName && "border border-gray-400 rounded-lg"
//                 }`}
//                 onChange={(e) => setContactName(e.target.value)}
//               />
//             </div>
//             <div>
//               {editName ? (
//                 <Tooltip title={"Edit name"}>
//                   <EditFilled
//                     onClick={() => setEditName(!editName)}
//                     className="p-3 hover:bg-gray-200 rounded-full cursor-pointer"
//                   />
//                 </Tooltip>
//               ) : (
//                 <>
//                   <CloseOutlined
//                     className="p-3 hover:bg-gray-200 rounded-full cursor-pointer"
//                     style={{ color: "red" }}
//                     onClick={handleCancelChange}
//                   />
//                   <CheckOutlined
//                     className="p-3 hover:bg-gray-200 rounded-full cursor-pointer"
//                     style={{ color: "green" }}
//                     onClick={handleUpdateName}
//                   />
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default ViewProfile;
