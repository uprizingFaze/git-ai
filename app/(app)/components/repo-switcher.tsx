"use client"
import React, { useEffect, useState } from "react";
import { getDataLocal } from "../../api/local";
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

interface Repo {
  user: string;
  repo: string;
}

interface Token {
  name: string;
  value: string;
}

interface DataLocal {
  repos: Repo[];
  token: Token[];
}

type Team = DataLocal["repos"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  className?: string;
}

export default function RepoSwitcher({ className }: TeamSwitcherProps) {
  const [dataLocal, setDataLocal] = useState<DataLocal[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  useEffect(() => {
    const data = getDataLocal();
    setDataLocal(data);
    if (data.length > 0 && data[0].repos.length > 0) {
      setSelectedTeam(data[0].repos[0]);
    }
  }, []);

  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [dialogType, setDialogType] = useState<"repo" | "token">("repo");

  const handleOpenDialog = (type: "repo" | "token") => {
    setDialogType(type);
    setShowNewTeamDialog(true);
  };

  const handleCloseDialog = () => {
    setShowNewTeamDialog(false);
  };

  return (
    <div>
      <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              aria-label="Select a team"
              className={cn("w-[260px] justify-between", className)}
            >
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${selectedTeam?.repo}.svg`}
                  alt={selectedTeam?.repo}
                />
                <AvatarFallback>GA</AvatarFallback>
              </Avatar>
              <div className="max-w-1">{selectedTeam?.repo}</div>
              <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandInput placeholder="Search team..." />
                <CommandEmpty>Equpo no encontrado.</CommandEmpty>
                {dataLocal?.map((group) => (
                  <CommandGroup key="Repos" heading="Repos">
                    {group.repos.map((team) => (
                      <CommandItem
                        key={team.repo}
                        onSelect={() => {
                          setSelectedTeam(team);
                          setOpen(false);
                        }}
                        className="text-sm"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${team.repo}.svg`}
                            alt={team.repo}
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {team.repo}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedTeam?.repo === team.repo
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
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      handleOpenDialog("repo");
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Añadir Repo
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              <CommandList>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      setOpen(false);
                      handleOpenDialog("token");
                    }}
                  >
                    <PlusCircledIcon className="mr-2 h-5 w-5" />
                    Añadir Token
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === "repo" ? "Añadir Repositorio" : "Añadir Token"}
            </DialogTitle>
            <DialogDescription>
              {dialogType === "repo"
                ? "Agrega el repositorio que deseas visualizar."
                : "Agrega el token que deseas utilizar."}
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="space-y-4 py-2 pb-4">
              {dialogType === "repo" ? (
                <>
                  <div>
                    <div className="space-y-4 py-2 pb-4">
                      <div className="space-y-2">
                        <Label htmlFor="user">Usuario</Label>
                        <Input id="user" placeholder="uprizinFaze" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="repo">Nombre Repositorio</Label>
                        <Input id="repo" placeholder="git-ai" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="token">Token GitHub</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona un Token" />
                          </SelectTrigger>
                          <SelectContent>
                            {dataLocal && dataLocal[0] && dataLocal[0].token ? (
                              dataLocal[0].token.map((token) => (
                                <SelectItem
                                  key={token.value}
                                  value={token.value}
                                >
                                  <span className="font-medium">
                                    {token.name}
                                  </span>{" "}
                                  -{" "}
                                  <span className="text-muted-foreground">
                                    {token.value}
                                  </span>
                                </SelectItem>
                              ))
                            ) : (
                              <p>No data available</p>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <div className="space-y-4 py-2 pb-4">
                      <div className="space-y-2">
                        <Label htmlFor="tokename">Nombre Token</Label>
                        <Input id="tokename" placeholder="TokenSudo" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="token">Token</Label>
                        <Input
                          id="token"
                          placeholder="asdjhasiduhasiu1928341298371"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
