/* eslint-disable react/prop-types */
export default function Butupdatepassword(props) {
  return (
    <button
      disabled={props.erreur == "" ? false : true}
      className={`${props.width} py-4  bg-main_yellow text-sm font-semibold rounded shadow-[0_4px_4px_rgba(0,0,0,0.25)] hover:bg-hover_yellow hover:scale-[1.02] hover:duration-300  disabled:bg-pressed_yellow focus:bg-pressed_yellow active:scale-95 active:duration-200 `}
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
