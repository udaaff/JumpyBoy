import { _decorator, Component, instantiate, Node, Prefab, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const NUM_BOXES = 8;
const BOX_SPEED = 6;

@ccclass('Boxes')
export class Boxes extends Component {
    @property({ type: Prefab })
    private boxPrefab: Prefab | null;

    private _isMoving = false;

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

    public move(): void {
        this._isMoving = true;
    }

    public reset(): void {
        this._isMoving = false;
        this.node.setPosition(new Vec3(0, 0, 0));
    }

    protected update(dt: number): void {
        if (!this._isMoving)
            return;

        this.node.setPosition(new Vec3(
            this.node.position.x,
            this.node.position.y,
            this.node.position.z - BOX_SPEED * dt
        ))
    }
}


