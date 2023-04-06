interface Props {
  classes: Class[] | undefined;
}

export default function DataList(props: Props) {
  if (!props.classes) {
    return <div></div>;
  }
  return (
    <datalist id="classes">
      {props.classes.map((eclass: Class, index: number) => {
        return <option value={eclass.name} key={index} />;
      })}
    </datalist>
  );
}
