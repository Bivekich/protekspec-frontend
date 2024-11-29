export function Container({ children, className = "" }) {
    return (
      <div className={`max-w-[1920px] mx-auto w-full ${className}`}>
        {children}
      </div>
  );
}

export default Container;
