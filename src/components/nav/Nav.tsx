import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDown } from "lucide-react";

export default function Nav() {
  return (
    <div className="grid grid-flow-col grid-cols-[auto_1fr] h-full">
      <nav className="row-span-full col-start-1 col-end-2 w-48 h-screen p-4 bg-secondary flex flex-col items-start">
        <p className="text-2xl text-background font-bold pt-1 pb-6">
          Brighter API
        </p>
        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/"}>Dashboard</Link>
        </Button>

        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/regions"}>Regions</Link>
        </Button>

        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/rooms"}>Rooms</Link>
        </Button>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl pl-0">
              <Link to={"/skills"}>Skills</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/combat"}>Combat</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/combat/requirements"}>Combat Reqs</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/gathering"}>Gathering</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/gathering/requirements"}>
                    Gathering Reqs
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/crafting"}>Crafting</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/crafting/requirements"}>
                    Crafting Reqs
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/skills/crafting/recipes"}>Craft Recipes</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/items"}>Items</Link>
        </Button>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/items/resources"}>Resources</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/items/resources/variants"}>Variants</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/items/consumables"}>Consumables</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/items/consumables/variants"}>Variants</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/items/weapons"}>Weapons</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/items/weapons/variants"}>Variants</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/items/armors"}>Armors</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/items/armors/variants"}>Variants</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Button variant={"link"} className="text-xl pl-0">
          <Link to={"/items/misc"}>Misc Items</Link>
        </Button>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/monsters"}>Monsters</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/monsters/variants"}>Variants</Link>
                </Button>
              </li>
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/monsters/drop-tables"}>Drop Tables</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/npcs"}>NPC&apos;s</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/npcs/vendors"}>Vendors</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible className="w-full">
          <div className="flex justify-between items-center w-full">
            <Button variant={"link"} className="text-xl px-0">
              <Link to={"/quests"}>Quests</Link>
            </Button>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <ChevronsUpDown className="h-4 w-4" />
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent>
            <ul className="list-['-_'] list-inside">
              <li>
                <Button variant={"link"} className="text-base pl-0">
                  <Link to={"/quests/steps"}>Steps</Link>
                </Button>
              </li>
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </nav>
      <div className="h-full w-full col-start-2 col-end-3">
        <Outlet />
      </div>
    </div>
  );
}
