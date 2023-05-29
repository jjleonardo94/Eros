import { useRouter } from "next/router";

const Profile = () => {
  const router = useRouter();
  return (
    <div className="mt-5 md:mt-0 md:col-span-2 h-screen w-screen flex flex-1 justify-center items-center flex-col">
      <h2 className="text-4xl font-bold text-center">Profile</h2>
      <button
        onClick={() => {
          router.push("/GasStockTransfer");
        }}
        className="bg-primary-500 hover:bg-primary-700 mt-5 text-white font-bold text-sm py-2 px-4 rounded-full">
        Go back
      </button>
    </div>
  );
}
 
export default Profile;