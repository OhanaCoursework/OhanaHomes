const Button = ({ children }) => {
  const buttonStyles = {
    whiteSpace: "nowrap",
    outline: "none",
    border: "none",
    minWidth: "100px",
    maxWidth: "200px",
    cursor: "pointer",
    textDecoration: "none",
    transition: "0.3s",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "14px 24px",
    color: "#fff",
    fontSize: "16px",
    marginLeft: "-15px",
  };

  const handleHover = (e) => {
    e.target.style.transform = "translateY(-2px)";
  };

  const handleHoverOut = (e) => {
    e.target.style.transform = "translateY(0)";
  };

  return (
    <a
      href="/marketplace"
      id="homes-button"
      style={buttonStyles}
      onMouseOver={handleHover}
      onMouseOut={handleHoverOut}
    >
      {children}
    </a>
  );
};

export default Button;
