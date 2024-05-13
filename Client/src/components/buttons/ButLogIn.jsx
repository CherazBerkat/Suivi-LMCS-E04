/* eslint-disable react/prop-types */

export default function ButLogIn(props) {
  return (
    <button
      className={`${props.width}  px-8 py-4 bg-main_yellow text-xs font-semibold rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  focus:bg-pressed_yellow focus:shadow-none active:scale-95 active:duration-300 `}
    >
      {props.text}
    </button>
  );
}

/*

used for: Log in pages yellow buttons

props:
Height Fixed (60px)
Padding 10px, 32px, 10px, 32px

usage :

<ButLogIn
    width="w-[218px]"
    text="Log in"
 />

 <ButLogIn
    width="w-[221px]"
    text="send an email"
 />

...

 */
