import { Component } from 'react';
import EnvPanel from './EnvPanel';
import React from 'react';
import RootSiblings from 'react-native-root-siblings';
import Toggler from './Toggler';

export default class PanelControl extends Component {
    static toggler = null;
    static panel = null;
    static showToggler() {
        if (PanelControl.toggler) {
            PanelControl.hideToggler();
        }
        PanelControl.toggler = new RootSiblings(<Toggler onPress={() => {
            PanelControl.showPanel();
        }}/>);
    }
    static hideToggler() {
        if (!PanelControl.toggler) { return; }
        PanelControl.toggler.destroy();
        PanelControl.toggler = null;
    }
    static showPanel() {
        if (PanelControl.panel) {
            PanelControl.hidePanel();
        }
        PanelControl.panel = new RootSiblings(<EnvPanel
            onPressMask={() => {
                PanelControl.hidePanel();
            }}
            onClose={() => {
                PanelControl.hidePanel();
                PanelControl.hideToggler();
            }}
        />);
    }
    static hidePanel() {
        if (!PanelControl.panel) { return; }
        PanelControl.panel.destroy();
        PanelControl.panel = null;
    }
    render() {
        return null;
    }
}
