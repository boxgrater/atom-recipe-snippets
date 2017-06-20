'use babel';

import RecipeSnippetsView from './recipe-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  recipeSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.recipeSnippetsView = new RecipeSnippetsView(state.recipeSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.recipeSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'recipe-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.recipeSnippetsView.destroy();
  },

  serialize() {
    return {
      recipeSnippetsViewState: this.recipeSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('RecipeSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
