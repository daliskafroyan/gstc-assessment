{
  description = "Next.js development environment with pnpm";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            nodePackages.pnpm
            
            # Additional useful tools
            watchman # for file watching
            git
            flyctl # Fly.io CLI
          ];

          shellHook = ''
            echo "Node.js + pnpm development environment"
            echo "Node.js version: $(node --version)"
            echo "pnpm version: $(pnpm --version)"
            echo "flyctl version: $(flyctl version)"
          '';
        };
      });
} 