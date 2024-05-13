/* eslint-disable react/prop-types */

export default function ButHome(props) {
  return (
    <button
      className={`${props.width} ${props.upper && "uppercase"} box-border h-12 bg-main_yellow text-xs font-semibold rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)] px-8 py-2.5 focus:bg-pressed_yellow hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  active:scale-95 active:duration-300`}
    >
      <div className=" flex flex-row justify-center items-center gap-4 ">
        {props.text}
        {props.icon && <img src={props.icon} />}
      </div>
    </button>
  );
}

/*

used for: landing pages yellow buttons

props:
Height Fixed (48px)
Padding 10px, 32px, 10px, 32px

usage :
<ButHome
    width="w-[145px]"
    isIcon={false}
    text="Log in"
    upper={true}
 />

 <ButHome
    width="w-[280px]"
    isIcon={false}
    text="Discover"
    icon={search}
    upper={False}
 />

 <ButHome
    width="w-[235px]"
    isIcon={false}
    text="Discover more"
    icon={arrow}
    upper={False}
 />
 */
