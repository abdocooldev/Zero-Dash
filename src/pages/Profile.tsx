import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarIcon from "boring-avatars";
import { Card, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import useStore, { type User } from "@/store/useStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

function Profile() {
  const fetchUser = useStore((state) => state.fetchUser);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  // const idParam = searchParams.get("id");
  const userId: number = id ? parseInt(id) : 1;
  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load user";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [fetchUser]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <>
      <PageTitle>Profile</PageTitle>
      <Card className="p-0 sm:flex-row items-center gap-0">
        <div className="user-profile flex items-center flex-col gap-2 mb-6 text-center w-full sm:w-3/7 lg:w-2/7 p-4">
          {user.avatar ? (
            <Avatar className="size-25">
              <AvatarImage
                src={user.avatar}
                alt={user.name}
                className="object-cover object-center"
              />
              <AvatarFallback>
                {user.name.split(" ")[0][0] + user.name.split(" ")[1][0]}
              </AvatarFallback>
            </Avatar>
          ) : (
            <AvatarIcon className="size-25" name={user.name} variant="beam" />
          )}
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p className="text-gray-500 text-sm">{user.bio}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {user.skills.map((skill, i) => {
              return (
                <Badge
                  key={i}
                  variant="secondary"
                  className="bg-[#eee] text-gray-800 text-xs sm:text-sm px-2 rounded-sm">
                  {skill}
                </Badge>
              );
            })}
          </div>
        </div>
        <div
          className="userinfo w-full sm:w-4/7 lg:w-5/7 relative border-t sm:border-0
        before:hidden sm:before:block before:bg-[var(--border)] before:w-px before:h-[70%] before:absolute before:top-[50%] before:left-0 before:-translate-y-[50%]">
          <CardContent className="flex flex-col gap-2 py-6 hover:bg-gray-50 transition">
            <h3 className="text-gray-500 font-semibold">General Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="text-sm text-gray-500 font-medium">
                <span>Full Name: </span>
                <span className="text-gray-900">{user.name}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Gender: </span>
                <span className="text-gray-900">{user.gender}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Location: </span>
                <span className="text-gray-900">{user.location}</span>
              </div>
            </div>
          </CardContent>
          <CardContent className="flex flex-col gap-2 py-6 hover:bg-gray-50 transition border-t">
            <h3 className="text-gray-500 font-semibold">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="text-sm text-gray-500 font-medium">
                <span>Email: </span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Phone: </span>
                <span className="text-gray-900">{user.phone}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Date of Birth: </span>
                <span className="text-gray-900">{user.birthDay}</span>
              </div>
            </div>
          </CardContent>
          <CardContent className="flex flex-col gap-2 py-6 hover:bg-gray-50 transition border-t">
            <h3 className="text-gray-500 font-semibold">Job Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="text-sm text-gray-500 font-medium">
                <span>Job Title: </span>
                <span className="text-gray-900">{user.jobTitle}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Programming Field: </span>
                <span className="text-gray-900">{user.programmingField}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Years Of Experience: </span>
                <span className="text-gray-900">{user.experienceYears}+</span>
              </div>
            </div>
          </CardContent>
          <CardContent className="flex flex-col gap-2 py-6 hover:bg-gray-50 transition border-t">
            <h3 className="text-gray-500 font-semibold">Billing Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              <div className="text-sm text-gray-500 font-medium">
                <span>Payment Method: </span>
                <span className="text-gray-900">{user.paymentMethod}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Email: </span>
                <span className="text-gray-900">{user.paymentEmail}</span>
              </div>
              <div className="text-sm text-gray-500 font-medium">
                <span>Subscription: </span>
                <span className="text-gray-900">{user.subscription}</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </>
  );
}

export default Profile;
