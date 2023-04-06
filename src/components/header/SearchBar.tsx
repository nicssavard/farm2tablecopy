import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../utils/api";
import DataList from "./DataList";

export default function SearchBar() {
  const [isValid, setIsValid] = useState<boolean>(true);

  const searchInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: classesData } = api.classes.getClasses.useQuery();

  const enteredClassChangeHandler = () => {
    setIsValid(true);
  };

  const searchClass = (event: React.FormEvent) => {
    event.preventDefault();
    if (!searchInput.current || !classesData) return;

    const searchTerm = searchInput.current.value;
    const foundClass = classesData.find(
      (eclass: Class) => eclass.name === searchTerm
    );

    if (foundClass) {
      setIsValid(true);
      router.push(`/class/${foundClass.id}`);
    } else {
      setIsValid(false);
    }

    searchInput.current.value = "";
  };

  return (
    <div className="h-13 flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
      <form onSubmit={searchClass}>
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search class
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-500"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              list="classes"
              ref={searchInput}
              onBlur={enteredClassChangeHandler}
              name="search"
              className={`bg-palette-100 focus:bg-palette-50 block  w-full rounded-md py-2 pl-10 pr-3 leading-5 text-gray-500 focus:text-gray-900 focus:outline-none  sm:text-xl ${
                isValid ? "placeholder-gray-500" : "placeholder-red-500"
              }`}
              placeholder={isValid ? "Search class" : "Invalid class"}
              type="search"
            />
            <DataList classes={classesData}></DataList>
          </div>
        </div>
      </form>
    </div>
  );
}
