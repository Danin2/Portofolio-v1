import { Object3DNode, MaterialNode } from '@react-three/fiber';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
      meshLineMaterial: MaterialNode<MeshLineMaterial, typeof MeshLineMaterial>;
    }
  }
}
