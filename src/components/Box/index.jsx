import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const Box = ({ children, className = "", collapsible = true }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`bg-card text-card-foreground rounded-xl border shadow-sm relative overflow-hidden ${className}`}>
      {collapsible && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-6 w-6 rounded-full hover:bg-muted z-10"
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? "–" : "+"}
        </Button>
      )}
      {isOpen && children}
    </div>
  );
};

Box.propTypes = { children: PropTypes.node, className: PropTypes.string, collapsible: PropTypes.bool };

export default Box;
