{
  inputs = {
    nixpkgs.url = "nixpkgs/nixos-22.11";
  };

  outputs = { self, nixpkgs }:
    let
      system = "x86_64-linux";

      pkgs = import nixpkgs {
        inherit system;
        overlays = [ self.overlays.default ];
      };

    in {
      packages."${system}" = {
        stackman-api-demo = pkgs.callPackage ./stackman-api {};
        stackman-ui = pkgs.callPackage ./stackman-ui {};
        stackman-ui-prototype = pkgs.callPackage ./stackman-ui-prototype {};
      };

      overlays.default = final: prev: { } // self.packages."${system}";

      devShells."${system}".default = pkgs.mkShell {
        nativeBuildInputs = [
          pkgs.nodejs
          pkgs.nodePackages.prettier
          pkgs.nodePackages.typescript-language-server
        ];
      };
    };
}
