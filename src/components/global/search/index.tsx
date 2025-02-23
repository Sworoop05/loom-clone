import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/use-mutation";
import useSearch from "@/hooks/useSearch";
import { User } from "lucide-react";
import React from "react";

type Props = {
  workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
  const { isFetching, onSearchQuery, onUser, query } = useSearch(
    "get-users",
    "USERS"
  );
  //WIP:wire up sending invitation
  // const {mutate,isPending} = useMutationData(['invite-member'],(data:{receiverId:string,email:string})=>)
  return (
    <div className="flex flex-col gap-y-5">
      <Input
        onChange={onSearchQuery}
        value={query}
        className={"bg-transparent border-2 outline-none"}
        placeholder="Search for your users... "
        type="text"
      />
      {isFetching? (<div className="flex flex-col gap-y-2">
        <Skeleton className="w-full h-8 rounded-xl"></Skeleton>
      </div>):(!onUser?(
        <p className="text-center text-sm text-[#a4a4a4]">No user found</p>
      ):(
        <div>
          {onUser.map(user=>(
            <div key={user.id} className="flex gap-x-3 items-center border-2 w-full p-3 rounded-xl">
              <Avatar>
                <AvatarImage src={user.image as string}/>
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h3 className="text-bold text-lg capitalize">{`${user.firstName} ${user.lastName}`}</h3>
                <p className="lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]">{user.subscription?.plan}</p>
             <div className="flex flex-1 justify-end items-center">
              <Button onClick={()=>{}} variant={"default"} className="w-5/12 font-bold">
                Invite
              </Button>
             </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Search;
