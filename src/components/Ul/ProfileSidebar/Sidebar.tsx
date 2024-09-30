"use client"
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { MdEdit } from "react-icons/md";

import { SidebarOptions } from "./SideberOptions";
import { adminLinks, userLinks } from "./constant";
const user = "USER";
const Sideber = () => {
  return (
    <div>
      <div className="rounded-xl  bg-default-200 p-2">
        <div className="w-full rounded-md">
          <div className="max-w-2xl  sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto   shadow-xl rounded-lg ">
            <div className="rounded-t-lg h-32 overflow-hidden">
              <img
                alt="Mountain"
                className=" h-full w-full"
                src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
              />
            </div>
            <div className="mx-auto w-32 h-32 relative -mt-16 border-4  rounded-full overflow-hidden">
              <img
                alt="Woman looking front"
                className="object-cover object-center h-32"
                src="https://www.mgp.net.au/wp-content/uploads/2023/05/150-1503945_transparent-user-png-default-user-image-png-png.png"
              />
            </div>
            <div className=" m-4">
              <h1 className="text-2xl font-semibold">test user</h1>
              <p className="break-words text-sm">test@gmail.com</p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti laudantium accusamus earum cumque error at, temporibus ad repellendus provident unde nesciunt delectus quaerat, pariatur ipsa incidunt nulla eaque ullam tempore?
            </div>
          </div>
        </div>

        <div className="mt-2 w-full rounded-md flex  justify-around items-center gap-2 ">
          <Button
            as={Link}
            className=" text-xs w-full "
            color="primary"
            href={"/profile/create-post"}
            variant="solid"
            size="sm"
          >
            + Add to post
          </Button>
          <Button
            className=" w-full text-xs"
            color="primary"
            endContent={<MdEdit />}
            size="sm"
            variant="flat"
          >
            Edit Profile
          </Button>
          <Button size="sm" color="primary" variant="light">
            ....
          </Button>
        </div>
      </div>
      <div className="mt-3 space-y-2 rounded-xl bg-default-300 p-2">
        <SidebarOptions links={user === "USER" ? userLinks : adminLinks} />

        <Button className="mt-2 w-full rounded-md" color="danger">
          logout{" "}
        </Button>
      </div>
    </div>
  );
};

export default Sideber;





