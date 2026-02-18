import { AiOutlineFileText } from "react-icons/ai";
import { HiOutlineCalculator } from "react-icons/hi";
import { IoNewspaperOutline } from "react-icons/io5";
import VehicleAnimation from "./VehicleAnimation";

const links = [
  {
    icon: AiOutlineFileText,
    label: "Документи необхідні для митн. оформлення",
    href: "https://help.ria.com/uk/index.php?/Knowledgebase/Article/View/630/146#start_content",
  },
  {
    icon: HiOutlineCalculator,
    label: "Приклади розрахунку вартості розмитнення",
    href: "https://help.ria.com/uk/index.php?/Knowledgebase/Article/View/631/146/primery-rschet-stoimosti-rstmozhki-rznykh-tipov-trnsportnykh-sredstv",
  },
  {
    icon: IoNewspaperOutline,
    label: "Новини по розмитненню автомобілів",
    href: "https://auto.ria.com/uk/news/tag/rastamozhka/",
  },
];

export default function SidebarLinks() {
  return (
    <>
      <div className="mt-4 space-y-2">
        {links.map((link, idx) => {
          const Icon = link.icon;
          return (
            <a
              key={idx}
              href={link.href}
              className="flex items-center hover:text-blue-200 transition transform hover:translate-x-1"
            >
              <Icon className="sidebar-icon mr-3 text-3xl text-white" aria-hidden />
              <span className="font-semibold text-blue-300">{link.label}</span>
            </a>
          );
        })}
      </div>
      <VehicleAnimation />
    </>
  );
}
