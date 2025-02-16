import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../api/auction";
import { getUserInfo } from "../api/auth";
import { StListWrapper } from "../components/profile/MyPagePosts.styles";
import PostList from "../components/profile/PostList/PostList";
import ProfileMenu from "../components/profile/ProfileMenu/ProfileMenu";
import EditProfile from "../components/profile/UserProfile/EditProfile/EditProfile";
import UserProfile from "../components/profile/UserProfile/UserProfile";
import WishList from "../components/profile/WishList/WishList";
import { useCustomQuery } from "../hooks/useCustomQuery";
import useGetAuthInfo from "../hooks/useGetAuthInfo";
import { QUERY_KEYS } from "../query/keys.constant";
import { User_info } from "../types/databaseReturnTypes";

const Profile = () => {
  const [activeTitle, setActiveTitle] = useState("내 게시물");

  const user = useGetAuthInfo();

  const userId = user?.user.id as string;

  const {
    data: currentUser,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
    staleTime: 0,
    select: (user) => user[0],
  });

  const userPostsQueryOption = {
    queryKey: [QUERY_KEYS.POSTS, userId],
    queryFn: () => fetchGetAuctions({ user_id: userId }),
    queryOptions: { enabled: !!userId },
  };

  const [data, isLoading] = useCustomQuery(userPostsQueryOption);

  const allUserPosts = data;

  const userAllPostsLength = allUserPosts?.length as number;

  return (
    <StProfileContainer>
      <UserProfile
        user={currentUser as User_info}
        userAllPostsLength={userAllPostsLength}
        isLoading={isLoading}
      />
      <StPostContainer>
        <StPostsWrapper>
          <ProfileMenu
            activeTitle={activeTitle}
            setActiveTitle={setActiveTitle}
          />
          <StListWrapper>
            {activeTitle === "내 게시물" && (
              <PostList
                title={activeTitle}
                userId={userId}
                userAllPostsLength={userAllPostsLength}
              />
            )}
            {activeTitle === "찜한 목록" && (
              <WishList title={activeTitle} userId={userId} />
            )}
            {activeTitle === "프로필 수정" && (
              <EditProfile
                title={activeTitle}
                user={currentUser as User_info}
                userId={userId}
              />
            )}
          </StListWrapper>
        </StPostsWrapper>
      </StPostContainer>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const StUserProfile = styled.div`
  display: flex;
  width: 100%;
  background-color: #333;
  height: 200px;
  min-height: 200px;
  align-items: center;
`;

const StPostContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  padding: 2rem;
  color: #222;
`;

const StPostsWrapper = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  transition: all 0.5s ease-in-out;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export default Profile;
