import { ModeToggle } from "../mode-toggle";

ModeToggle;

function Footer() {
  return (
    <div className="footer border-t text-center py-10">
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Footer;
