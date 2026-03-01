import Button from "@/src/components/ui/Button";
import Container from "@/src/components/ui/Container";
import type { Spec } from "@/src/types/spec";

type HeaderProps = {
  spec: Spec;
};

const NAV_ITEMS = [
  { label: "Features", href: "#features" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({ spec }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="text-base font-semibold text-zinc-900">
          {spec.brandName}
        </a>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative text-sm text-zinc-600 transition-colors duration-300 hover:text-zinc-900 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-zinc-900 after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <Button primaryColor={spec.theme.primaryColor}>{spec.cta.primary}</Button>
      </Container>
    </header>
  );
}
