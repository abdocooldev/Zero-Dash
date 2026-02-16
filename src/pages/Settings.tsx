import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import PageTitle from "@/components/ui/page-title";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Computer,
  Database,
  Facebook,
  Linkedin,
  Server,
  Twitter,
  Youtube,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
function Settings() {
  const settings = useStore((state) => state.settings);
  const [maintenance, setMaintenance] = useState<boolean>(false);
  const [twoAuth, setTwoAuth] = useState<boolean>(false);
  const [widgesToggles, setWidgetsToggles] = useState({
    quickDraft: true,
    yearlyTargets: true,
    ticketsStatistics: true,
    latestNews: true,
    latestTasks: true,
    topSearchItems: true,
  });
  const [backupFreq, setBackupFreq] = useState({
    daily: false,
    weekly: false,
    monthly: false,
  });
  const [backupLocation, setBackupLoction] = useState({
    local: false,
    database: false,
    cloud: false,
  });
  useEffect(() => {
    setMaintenance(settings.maintenance);
    setTwoAuth(settings.twoFactorAuth);
    setWidgetsToggles({ ...settings.widgetsControl });
    setBackupFreq({ ...settings.backup?.backupFrequency });
    setBackupLoction({ ...settings.backup?.backupLocation });
    console.log(settings.backup?.backupFrequency);
  }, [settings]);
  return (
    <>
      <PageTitle>Settings</PageTitle>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] gap-6">
        <Card className="gap-3 p-6">
          <CardTitle className="text-2xl font-bold">Site Control</CardTitle>
          <CardDescription className="text-sm">
            Control The Website If There Is Maintenance
          </CardDescription>
          <FieldSet className="w-full">
            <FieldGroup>
              <Field className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="feedback">Website Control</FieldLabel>
                  <FieldDescription>
                    Open/Close Website And Type The Reason
                  </FieldDescription>
                </div>
                <Switch
                  className="data-[state=checked]:bg-blue-500 relative scale-150 cursor-pointer"
                  checked={maintenance}
                  onClick={() => setMaintenance(!maintenance)}
                />
              </Field>
              <Textarea
                placeholder="Close Message content."
                className="min-h-40"
                value={settings.maintenanceMessage}
              />
            </FieldGroup>
          </FieldSet>
        </Card>
        <Card className="gap-3 p-6">
          <CardTitle className="text-2xl font-bold">General Info</CardTitle>
          <CardDescription className="text-sm">
            General Information About Your Account
          </CardDescription>
          <FieldSet className="w-full">
            <FieldGroup className="[&_input]:h-10 [&_input]:border gap-3">
              <Field className="flex flex-col">
                <FieldLabel
                  className="text-muted-foreground"
                  htmlFor="first-name">
                  First Name
                </FieldLabel>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="First Name"
                  value={settings.adminFirstName}
                />
              </Field>
              <Field className="flex flex-col">
                <FieldLabel
                  className="text-muted-foreground"
                  htmlFor="last-name">
                  Last Name
                </FieldLabel>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Last Name"
                  value={settings.adminLastName}
                />
              </Field>
              <Field className="flex flex-col">
                <FieldLabel className="text-muted-foreground" htmlFor="email">
                  Email
                </FieldLabel>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email"
                    disabled
                    className="bg-slate-200 cursor-not-allowed"
                    value="abdocooldev@gmail.com"
                  />
                  <Button
                    variant="ghost"
                    className="text-blue-600 font-semibold">
                    Change
                  </Button>
                </div>
              </Field>
            </FieldGroup>
          </FieldSet>
        </Card>
        <Card className="gap-3 p-6">
          <CardTitle className="text-2xl font-bold">Security Info</CardTitle>
          <CardDescription className="text-sm">
            Security Information About Your Account
          </CardDescription>
          <FieldSet className="w-full">
            <FieldGroup>
              <Field className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="feedback">Password</FieldLabel>
                  <FieldDescription>
                    Last Change On: {settings.passLastChange || "Never"}
                  </FieldDescription>
                </div>
                <Button className="bg-blue-500 w-fit!">Change</Button>
              </Field>
              <Field className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="feedback">
                    Two-Factor Authentication
                  </FieldLabel>
                  <FieldDescription>
                    Enable/Disable The Feature
                  </FieldDescription>
                </div>
                <Switch
                  className="data-[state=checked]:bg-blue-500 relative scale-150 -translate-x-2/6 cursor-pointer"
                  checked={twoAuth}
                  onClick={() => setTwoAuth(!twoAuth)}
                />
              </Field>
              <Field className="flex flex-row justify-between items-center">
                <div className="flex flex-col gap-2">
                  <FieldLabel htmlFor="feedback">Devices</FieldLabel>
                  <FieldDescription>
                    Check The Login Devices List
                  </FieldDescription>
                </div>
                <Button className="bg-gray-200 text-foreground w-fit! hover:bg-primary hover:text-white">
                  Devices
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </Card>
        <Card className="gap-3 p-6">
          <CardTitle className="text-2xl font-bold">Social Info</CardTitle>
          <CardDescription className="text-sm">
            Social Media Information
          </CardDescription>
          <div className="flex flex-col gap-4">
            <InputGroup>
              <InputGroupInput
                placeholder="Twitter Username"
                className="h-10"
              />
              <InputGroupAddon className="border-r pr-2">
                <Twitter />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput
                placeholder="Facebook Username"
                className="h-10"
              />
              <InputGroupAddon className="border-r pr-2">
                <Facebook />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput
                placeholder="LinkedIn Username"
                className="h-10"
              />
              <InputGroupAddon className="border-r pr-2">
                <Linkedin />
              </InputGroupAddon>
            </InputGroup>
            <InputGroup>
              <InputGroupInput
                placeholder="Youtube Username"
                className="h-10"
              />
              <InputGroupAddon className="border-r pr-2">
                <Youtube />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </Card>
        <Card className="gap-3 p-6">
          <CardTitle className="text-2xl font-bold">Widgets Control</CardTitle>
          <CardDescription className="text-sm">
            Show/Hide Widgets
          </CardDescription>
          <FieldSet>
            <FieldGroup className="gap-3">
              <Field orientation="horizontal">
                <Checkbox
                  id="quick-draft"
                  name="quick-draft"
                  checked={widgesToggles.quickDraft}
                  onClick={() =>
                    setWidgetsToggles({
                      ...widgesToggles,
                      quickDraft: !widgesToggles.quickDraft,
                    })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer"
                />
                <FieldLabel
                  htmlFor="quick-draft"
                  className="text-[1rem] font-500 cursor-pointer">
                  Quick Draft
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="yearly-targets"
                  name="yearly-targets"
                  checked={widgesToggles.yearlyTargets}
                  onClick={() =>
                    setWidgetsToggles({
                      ...widgesToggles,
                      yearlyTargets: !widgesToggles.yearlyTargets,
                    })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer"
                />
                <FieldLabel
                  htmlFor="yearly-targets"
                  className="text-[1rem] font-500 cursor-pointer">
                  Yearly Targets
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="tickets-statistics"
                  name="tickets-statistics"
                  checked={widgesToggles.ticketsStatistics}
                  onClick={() =>
                    setWidgetsToggles({
                      ...widgesToggles,
                      ticketsStatistics: !widgesToggles.ticketsStatistics,
                    })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer"
                />
                <FieldLabel
                  htmlFor="tickets-statistics"
                  className="text-[1rem] font-500 cursor-pointer">
                  Tickets Statistics
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="latest-news"
                  name="latest-news"
                  checked={widgesToggles.latestNews}
                  onClick={() =>
                    setWidgetsToggles({
                      ...widgesToggles,
                      latestNews: !widgesToggles.latestNews,
                    })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer"
                />
                <FieldLabel
                  htmlFor="latest-news"
                  className="text-[1rem] font-500 cursor-pointer">
                  Latest News
                </FieldLabel>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="latest-tasks"
                  name="latest-tasks"
                  checked={widgesToggles.latestTasks}
                  onClick={() =>
                    setWidgetsToggles({
                      ...widgesToggles,
                      latestTasks: !widgesToggles.latestTasks,
                    })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer"
                />
                <FieldLabel
                  htmlFor="latest-tasks"
                  className="text-[1rem] font-500 cursor-pointer">
                  Latest Tasks
                </FieldLabel>
              </Field>

              <Field orientation="horizontal">
                <Checkbox
                  id="top-search"
                  name="top-search"
                  checked={widgesToggles.topSearchItems}
                  onClick={() =>
                    setWidgetsToggles({
                      ...widgesToggles,
                      topSearchItems: !widgesToggles.topSearchItems,
                    })
                  }
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 cursor-pointer"
                />
                <FieldLabel
                  htmlFor="top-search"
                  className="text-[1rem] font-500 cursor-pointer">
                  Top Search Items
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
        </Card>
        <Card className="gap-3 p-6">
          <CardTitle className="text-2xl font-bold">Backup Manager</CardTitle>
          <CardDescription className="text-sm">
            Control Backup Time And Location
          </CardDescription>
          <RadioGroup defaultValue="daily" className="w-fit">
            <div className="flex items-center gap-3 *:cursor-pointer">
              <RadioGroupItem
                value="default"
                id="daily"
                className="size-6 [&_span_svg]:size-4 [&_span_svg]:fill-blue-500 [&_span_svg]:text-blue-500 cursor-pointer"
                checked={backupFreq.daily}
                onClick={() =>
                  setBackupFreq({ daily: true, weekly: false, monthly: false })
                }
              />
              <Label htmlFor="daily" className="cursor-pointer">
                Daily
              </Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem
                value="weekly"
                id="weekly"
                className="size-6 [&_span_svg]:size-4 [&_span_svg]:fill-blue-500 [&_span_svg]:text-blue-500 cursor-pointer"
                checked={backupFreq.weekly}
                onClick={() =>
                  setBackupFreq({ daily: false, weekly: true, monthly: false })
                }
              />
              <Label htmlFor="weekly" className="cursor-pointer">
                Weekly
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem
                value="monthly"
                id="monthly"
                className="size-6 [&_span_svg]:size-4 [&_span_svg]:fill-blue-500 [&_span_svg]:text-blue-500 cursor-pointer"
                checked={backupFreq.monthly}
                onClick={() =>
                  setBackupFreq({ daily: false, weekly: false, monthly: true })
                }
              />
              <Label htmlFor="monthly" className="cursor-pointer">
                Monthly
              </Label>
            </div>
          </RadioGroup>
          <div className="backup-locations grid grid-cols-3 gap-2 mt-4 *:cursor-pointer">
            <div
              className="group flex flex-col items-center gap-2 border-2 border-gray-300 rounded-xl p-4 font-medium data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]: transition-[0.3s]"
              data-state={backupLocation.local ? "checked" : "unchecked"}
              onClick={() =>
                setBackupLoction({ local: true, database: false, cloud: false })
              }>
              <Computer className="group-data-[state=checked]:stroke-blue-500 transition-[0.3s]" />
              Local
            </div>
            <div
              className="group flex flex-col items-center gap-2 border-2 border-gray-300 rounded-xl p-4 font-medium data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]: transition-[0.3s]"
              data-state={backupLocation.database ? "checked" : "unchecked"}
              onClick={() =>
                setBackupLoction({ local: false, database: true, cloud: false })
              }>
              <Database className="group-data-[state=checked]:stroke-blue-500 transition-[0.3s]" />
              Database
            </div>
            <div
              className="group flex flex-col items-center gap-2 border-2 border-gray-300 rounded-xl p-4 font-medium data-[state=checked]:text-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]: transition-[0.3s]"
              data-state={backupLocation.cloud ? "checked" : "unchecked"}
              onClick={() =>
                setBackupLoction({ local: false, database: false, cloud: true })
              }>
              <Server className="group-data-[state=checked]:stroke-blue-500 transition-[0.3s]" />
              Cloud
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

export default Settings;
