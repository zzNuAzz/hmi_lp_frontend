import { Header } from '@components/';
import React from 'react';
import SettingContent from './SettingContent';

export default function SettingPage() {
  return (
    <div className="SettingPage">
        <Header back={["Back", "/"]} isConfig={false} title="Setting" />
        <SettingContent />
    </div>
  );
}
