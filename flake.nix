{
  inputs = {
    nixpkgs = { url = "nixpkgs/nixos-22.05-small"; };
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";

      pkgs = import nixpkgs {
        inherit system;
      };

    in {
      devShells."${system}".default = pkgs.mkShell {
        nativeBuildInputs = [
          pkgs.nodejs
          pkgs.nodePackages.typescript-language-server
        ];
      };
    };
}
