import FormModel from './model/form-model';
import ItemModel from './model/item-model';
import ContentPresenter from './presenter/content-presenter';
import HeaderPresenter from './presenter/header-presenter';

const headerContentNode = document.querySelector('.trip-main');
const eventsNode = document.querySelector('.trip-events');

const itemModel = new ItemModel();
const formModel = new FormModel();

const headerPresenter = new HeaderPresenter(headerContentNode);
const contentPresenter = new ContentPresenter({
  contentNode: eventsNode,
  itemModel,
  formModel,
});

headerPresenter.init();
contentPresenter.init();
