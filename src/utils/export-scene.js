import { ColladaExporter } from 'three/examples/jsm/exporters/ColladaExporter';
import { xml2js, js2xml } from 'xml-js';

import { saveAs } from 'file-saver';
import { Project } from '../class/export';
import { parseData } from '../components/viewer3d/scene-creator';

const exportScene = ({ state, context, catalog }) => {
  state = Project.unselectAll(state).updatedState;
  let actions = {
    areaActions: context.areaActions,
    holesActions: context.holesActions,
    itemsActions: context.itemsActions,
    linesActions: context.linesActions,
    projectActions: context.projectActions
  };

  let scene = state.get('scene');
  // LOAD DATA
  let planData = parseData(scene, actions, catalog);
  setTimeout(() => {
    const { plan } = planData;
    plan.position.set(plan.position.x, 0.1, plan.position.z);
    const exporter = new ColladaExporter();
    exporter.parse(plan, ({ data }) => {
      let parsedFile = xml2js(data, { compact: true });
      parsedFile.COLLADA.asset['unit'] = {
        _attributes: { name: 'centimeter', meter: '0.01' }
      };
      let fixedData = js2xml(parsedFile, { compact: true, spaces: 4 });

      const fileBlob = new Blob([fixedData], {
        type: 'text/plain;charset=utf-8'
      });

      saveAs(fileBlob, 'planner.DAE');
    });
  }, 1000);
};

export default exportScene;
