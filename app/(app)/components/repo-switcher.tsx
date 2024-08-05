"use client";
import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loadData, saveData } from "@/app/(app)/test/localStorage"; // Modifica el path según tu estructura de archivos

interface Team {
  label: string;
  value: string;
}

interface Group {
  label: string;
  teams: Team[];
}

export default function TeamSwitcher({
  className,
}: React.ComponentPropsWithoutRef<typeof PopoverTrigger>) {
  const [open, setOpen] = React.useState(false);
  const [showNewRepoDialog, setShowNewRepoDialog] = React.useState(false);
  const [showNewTokenDialog, setShowNewTokenDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>({
    label: "",
    value: "",
  });
  const [groups, setGroups] = React.useState<Group[]>([
    { label: "Repositories", teams: [] },
  ]);
  const [tokens, setTokens] = React.useState<{ name: string; value: string }[]>(
    []
  );

  // Agregar nuevos estados para manejar los inputs del diálogo
  const [newRepoUser, setNewRepoUser] = React.useState("");
  const [newRepoName, setNewRepoName] = React.useState("");
  const [selectedToken, setSelectedToken] = React.useState("");

  const [newTokenName, setNewTokenName] = React.useState("");
  const [newTokenValue, setNewTokenValue] = React.useState("");

  React.useEffect(() => {
    const data = loadData();
    const reposTeams = data.repos.map((repo) => ({
      label: repo.repo,
      value: repo.repo,
    }));

    setGroups([
      {
        label: "Repositories",
        teams: reposTeams,
      },
      {
        label: "Tokens",
        teams: data.token.map((token) => ({
          label: token.name,
          value: token.value,
        })),
      },
    ]);

    setTokens(data.token);
    if (reposTeams.length > 0) {
      setSelectedTeam(reposTeams[0]);
    }
  }, []);

  const handleAddRepo = () => {
    if (newRepoUser && newRepoName && selectedToken) {
      const newRepo = {
        user: newRepoUser,
        repo: newRepoName,
        token: selectedToken,
      };

      const data = loadData();
      data.repos.push(newRepo);
      saveData(data);

      // Resetear campos y cerrar diálogo
      setNewRepoUser("");
      setNewRepoName("");
      setSelectedToken("");
      setShowNewRepoDialog(false);
      // Actualizar grupos después de añadir el nuevo repositorio
      updateGroups();
    }
  };

  const handleAddToken = () => {
    if (newTokenName && newTokenValue) {
      const newToken = {
        name: newTokenName,
        value: newTokenValue,
      };

      const data = loadData();
      data.token.push(newToken);
      saveData(data);

      // Resetear campos y cerrar diálogo
      setNewTokenName("");
      setNewTokenValue("");
      setShowNewTokenDialog(false);
      // Actualizar grupos después de añadir el nuevo token
      updateGroups();
    }
  };

  const updateGroups = () => {
    const data = loadData();
    const reposTeams = data.repos.map((repo) => ({
      label: repo.repo,
      value: repo.repo,
    }));

    setGroups([
      {
        label: "Repositories",
        teams: reposTeams,
      },
      {
        label: "Tokens",
        teams: data.token.map((token) => ({
          label: token.name,
          value: token.value,
        })),
      },
    ]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team"
          className={cn("w-[200px] justify-between", className)}
        >
          <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
              alt={selectedTeam.label}
              className=""
            />
            <AvatarFallback>GA</AvatarFallback>
          </Avatar>
          {selectedTeam.label || "Selecciona un Repo"}
          <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Buscar repo" />
            <CommandEmpty>No se encontro</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.value}.png`}
                        alt={team.label}
                        className=""
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam.value === team.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="dialog" variant="dialog">
                      Añadir Repo
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir Repo</DialogTitle>
                      <DialogDescription>
                        Añade un repositorio para trabajar
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2 pb-4">
                      <div className="space-y-2">
                        <Label htmlFor="user">Usuario</Label>
                        <Input
                          id="user"
                          placeholder="uprizingFaze"
                          value={newRepoUser}
                          onChange={(e) => setNewRepoUser(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="repo">Repositorio</Label>
                        <Input
                          id="repo"
                          placeholder="git-ai"
                          value={newRepoName}
                          onChange={(e) => setNewRepoName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="token">Token</Label>
                        <Select onValueChange={setSelectedToken}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un token" />
                          </SelectTrigger>
                          <SelectContent>
                            {tokens.map((token) => (
                              <SelectItem key={token.name} value={token.value}>
                                <span className="font-medium">
                                  {token.name}
                                </span>{" "}
                                -{" "}
                                <span className="text-muted-foreground">
                                  {token.value}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowNewRepoDialog(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" onClick={handleAddRepo}>
                        Continuar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem>
                <PlusCircledIcon className="mr-2 h-5 w-5" />
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="dialog" variant="dialog">
                      Añadir Token
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Añadir Token</DialogTitle>
                      <DialogDescription>
                        Añade un token de github para trabajar
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2 pb-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                          id="name"
                          placeholder="Token-Admin"
                          value={newTokenName}
                          onChange={(e) => setNewTokenName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="value">Valor</Label>
                        <Input
                          id="value"
                          placeholder="87zx5czx8c5"
                          value={newTokenValue}
                          onChange={(e) => setNewTokenValue(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setShowNewTokenDialog(false)}
                      >
                        Cancelar
                      </Button>
                      <Button type="submit" onClick={handleAddToken}>
                        Continuar
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
