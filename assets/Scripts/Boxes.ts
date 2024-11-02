import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const NUM_BOXES = 8;

@ccclass('Boxes')
export class Boxes extends Component {
    @property({ type: Prefab })
    private boxPrefab: Prefab | null;

    protected override onLoad(): void {
        this.node.removeAllChildren();

        for (let i = 1; i <= NUM_BOXES; i++) {
            const box = instantiate(this.boxPrefab);
            this.node.addChild(box);

            box.setPosition(new Vec3(
                -0.5 + Math.random(),
                0,
                (i + 2) * 8 - 2 + 4 * Math.random()
            ));
        }
    }
}


