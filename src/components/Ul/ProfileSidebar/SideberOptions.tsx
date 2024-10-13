import { Button } from "@nextui-org/button";
import Link from "next/link";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  return (
    <div className="flex flex-col gap-1">
      {links.map((link) => (
        <Button
          key={link.href}
          as={Link}
          className="mt-2 w-full rounded-md bg-default-200"
          href={link.href}
        >
          {link.label}
        </Button>
      ))}
    </div>
  );
};
