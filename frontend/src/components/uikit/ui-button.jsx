export const Button = ({children, className='', onClick}) => {
  return (
    <div>
      <button className={'btn ' + className} type="submit" onClick={onClick}>
        {children}
      </button>
    </div>
  );
};
