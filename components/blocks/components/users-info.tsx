import { fetchUser } from "@/app/api/github-api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SiGithub, SiTwitter } from "react-icons/si";

async function UserInfo({ username = "vercel" }: { username?: string }) {
  const userInfo = await fetchUser(username);

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-col items-center">
        <div className="grid grid-cols-2 mt-4">
          <Avatar className="h-16 w-16 mr-8 justify-self-end">
            <AvatarImage src={userInfo.avatar_url} alt={userInfo.name} />
            <AvatarFallback>GA</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-bold">{userInfo.login}</h3>
            <p className="text-muted-foreground">{userInfo.name}</p>
          </div>
        </div>
        <div className="flex mt-6">
          <div className="dark:bg-black bg-white p-2 rounded-lg border">
            <a href={userInfo.html_url}>
              <SiGithub className="h-7 w-7" />
            </a>
          </div>
          <div className="flex items-center ml-4">
            <div className="dark:bg-black bg-white p-2 rounded-lg border">
              <a href={`https://x.com/${userInfo.login}`}>
                <SiTwitter className="h-7 w-7" />
              </a>
            </div>
          </div>
        </div>
        <p className="my-10 max-w-96">&quot;{userInfo.bio}&quot;</p>
        <div className="flex">
          <div className="dark:bg-black bg-white py-8 px-6 rounded-lg border">
            <p className="font-bold text-2xl">{userInfo.followers}</p>
            <p className="text-muted-foreground">Seguidores</p>
          </div>
          <div className="flex items-center ml-4">
            <div className="dark:bg-black bg-white py-8 px-6 rounded-lg border">
              <p className="font-bold text-2xl">{userInfo.following}</p>
              <p className="text-muted-foreground">Siguiendo</p>
            </div>
          </div>
        </div>
        <div className="mt-16">
          <p className="text-muted-foreground">
            Ubicación: {userInfo.location}
          </p>
          <p className="text-muted-foreground">Empresa: {userInfo.company}</p>
          <a
            href={userInfo.blog}
            className="text-muted-foreground dark:hover:text-white hover:text-black"
          >
            Sitio web: {userInfo.blog}
          </a>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;