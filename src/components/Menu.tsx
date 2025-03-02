import { role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/home.png",
        label: "Dashboard",
        href: "/admin",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/teacher.png",
        label: "Mifugo",
        href: "/list/kondoo",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/student.png",
        label: "Ranch Managers",
        href: "/list/ranch-managers",
        visible: ["admin", "teacher"],
      },
      
      
    ],
  },
  {
    title: "Analysis",
    items: [
      {
        icon: "/message.png",
        label: "Birth Anaysis",
        href: "/lis/messages",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/announcement.png",
        label: "Death Analysis",
        href: "/lis/announcements",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/parent.png",
        label: "Loses Analysis",
        href: "/lis/parents",
        visible: ["admin", "teacher"],
      },
    ],
  },
  {
    title: "Boma Data",
    items: [
      {
        icon: "/subject.png",
        label: "Mkata Ranch",
        href: "/lis/subjects",
        visible: ["admin"],
      },
      {
        icon: "/class.png",
        label: "Ruvu Ranch",
        href: "/lis/classes",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/lesson.png",
        label: "Kongwa Ranch",
        href: "/lis/lessons",
        visible: ["admin", "teacher"],
      },
      {
        icon: "/exam.png",
        label: "Misenyi Ranch",
        href: "/lis/exams",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/assignment.png",
        label: "Morogoro Ranch",
        href: "/lis/assignments",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/result.png",
        label: "Katavi Ranch",
        href: "/lis/results",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/attendance.png",
        label: "Mbeya Ranch",
        href: "/lis/attendance",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/calendar.png",
        label: "Events",
        href: "/lis/events",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ]
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/profile.png",
        label: "Profile",
        href: "/profile",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/setting.png",
        label: "Settings",
        href: "/settings",
        visible: ["admin", "teacher", "student", "parent"],
      },
      {
        icon: "/logout.png",
        label: "Logout",
        href: "/logout",
        visible: ["admin", "teacher", "student", "parent"],
      },
    ],
  },
];

const Menu = () => {
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2" key={i.title}>
          <span className="hidden lg:block text-gray-400 font-light my-4">
            {i.title}
          </span>
          {i.items.map((item) => {
            if (item.visible.includes(role)) {
              return (
                <Link
                  href={item.href}
                  key={item.label}
                  className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-lamaYellow"
                >
                  <Image src={item.icon} alt="" width={20} height={20} />
                  <span className="hidden lg:block">{item.label}</span>
                </Link>
              );
            }
          })}
        </div>
      ))}
    </div>
  );
};

export default Menu;
