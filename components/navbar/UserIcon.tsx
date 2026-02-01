import { LuUser } from "react-icons/lu";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

const UserIcon = async () => {
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  if (profileImage)
    return (
      <Image
        src={profileImage}
        className="w-6 h-6 rounded-full object-cover"
        alt="user"
        width={24}
        height={24}
      />
    );
  return <LuUser className="w-8 h-8 bg-primary rounded-full text-white" />;
};

export default UserIcon;
