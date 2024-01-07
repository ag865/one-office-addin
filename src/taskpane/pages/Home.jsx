/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React, { useCallback, useMemo, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { PlusIcon } from "../icons/PlusIcon";
import { MinusIcon } from "../icons/MinusIcon";
import { insertText, insertFunds } from "../office-document";
import { Button } from "../components/Button";
import { getFunds } from "../api/funds";

const LabelRow = ({ label }) => {
  const onLabelClick = useCallback(() => {
    insertText(label["name-en"]);
  }, [label]);

  return (
    <div className="py-1 px-2 border text-sm">
      <button onClick={onLabelClick}>{label["name-en"]}</button>
    </div>
  );
};

const ModuleRow = ({ label, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  return (
    <div className="border rounded p-1 flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <button onClick={toggleMenu}>
          {isMenuOpen ? <MinusIcon className="w-3 h-3 fill-black" /> : <PlusIcon className="w-3 h-3 fill-black" />}
        </button>
        <div className="font-semibold">{label}</div>
      </div>
      {data?.length && isMenuOpen
        ? data.map((label, index) => <LabelRow label={label} key={index.toString()} />)
        : null}
    </div>
  );
};

const ObjectRow = ({ label, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((isOpen) => !isOpen);
  }, []);

  return (
    <div className="border rounded p-1 flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <button onClick={toggleMenu}>
          {isMenuOpen ? <MinusIcon className="w-3 h-3 fill-black" /> : <PlusIcon className="w-3 h-3 fill-black" />}
        </button>
        <div className="font-semibold">{label}</div>
      </div>
      {data?.length && isMenuOpen
        ? data.map((table) => <ModuleRow label={table.table} data={table.labels} key={table.table} />)
        : null}
    </div>
  );
};

const ObjectListing = () => {
  const { user } = useAuth();

  const labels = useMemo(() => {
    if (user?.tenant?.labels?.length) {
      return user?.tenant?.labels?.filter((label) => label?.changeIn === "Tables");
    }

    return [];
  }, [user?.tenant?.labels?.length]);

  const tableLabels = useMemo(() => {
    if (!labels) return {};
    return labels.reduce((acc, value, index) => {
      const groupKey = value.module;

      if (index === 1) {
        return {
          [groupKey]: [
            { ...acc, labels: acc?.labels ? JSON.parse(acc.labels) : [] },
            { ...value, labels: value?.labels ? JSON.parse(value.labels) : [] },
          ],
        };
      }

      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push({ ...value, labels: JSON.parse(value.labels) });

      return acc;
    }, {});
  }, [labels]);

  return (
    <div className="flex flex-col space-y-2">
      <h1 className="font-bold text-xl">All Objects</h1>
      {Object.keys(tableLabels).map((key) => (
        <ObjectRow key={key} data={tableLabels[key]} label={key} />
      ))}
    </div>
  );
};

const ImportData = () => {
  const { baseUrl, userToken } = useAuth();

  const onImportDataPress = useCallback(async () => {
    try {
      const response = await getFunds({ url: baseUrl, token: userToken });

      console.log(response.data);
    } catch (e) {
      console.error("Error Fetching Data");
    }
  }, [baseUrl, userToken]);

  return (
    <div className="flex-1 flex items-center">
      <Button size="sm" onClick={onImportDataPress}>
        Import Data
      </Button>
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col p-2 space-y-3">
      <ImportData />
      <ObjectListing />
    </div>
  );
};

export { Home };
