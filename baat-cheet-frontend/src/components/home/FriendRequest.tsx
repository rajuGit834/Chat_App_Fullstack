import { useSelector } from "react-redux";
import { Button } from "antd";
import { getSocket } from "../../../services/socket";

const FriendRequest = () => {
  const users = useSelector((state: any) => state.users.users);
  const currentUser = useSelector((state: any) => state.users.getCurrentUser);

  const filteredCurrentUser = users.filter(
    (user: any) => user._id === currentUser._id
  )[0];

  const findNameOfRequestSender = (senderid: any) => {
    const filterSender = users.filter((user: any) => user._id === senderid)[0];
    return filterSender.firstName + " " + filterSender.lastName;
  };

  // request sender is now receiver because i am giving response to request sender
  const handleFriendRequestResponse = (status: string , receiver: any, sender: any) => {
    const socket = getSocket();
    socket.emit("response-on-request", {name: currentUser.name, status, receiver, sender});
  };

  return (
    <div className="mt-2">
      <p className="text-[20px] font-bold">Requests</p>
      {filteredCurrentUser.friendRequest.length > 0 ? (
        filteredCurrentUser.friendRequest.map((reqId: any) => {
          return (
            <div key={reqId} className="flex justify-around">
              <p>{findNameOfRequestSender(reqId)}</p>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleFriendRequestResponse("confirm", reqId, currentUser._id)}
                  type={"primary"}
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => handleFriendRequestResponse("reject", reqId, currentUser._id)}
                  type={"secondary"}
                >
                  Reject
                </Button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No any request yet</p>
      )}
    </div>
  );
};

export default FriendRequest;
