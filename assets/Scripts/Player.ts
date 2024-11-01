import { _decorator, Component, EventMouse, EventTouch, Input, input, Node, SkeletalAnimation, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const JUMP_HEIGHT = 3.5;
const JUMP_DURATION = 0.5;

@ccclass('Player')
export class Player extends Component {
    private _isJumping = false;
    private _animation: SkeletalAnimation | null;

    protected override onLoad(): void {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this._animation = this.getComponent(SkeletalAnimation);
    }

    private onTouchStart(event: EventTouch): void {
        this.jump();
    }

    private onJumpComplete(): void {
        this._animation.crossFade("Root|Run");
        this._isJumping = false;
    }

    private jump(): void {
        if (this._isJumping)
            return;

        this._isJumping = true;
        this._animation.crossFade("Root|Jump");

        tween(this.node)
            .by(JUMP_DURATION, { position: new Vec3(0, JUMP_HEIGHT, 0) }, { easing: 'smooth' })
            .by(JUMP_DURATION, { position: new Vec3(0, -JUMP_HEIGHT, 0) }, { easing: 'smooth' })
            .call(this.onJumpComplete, this)
            .start();
    }
}


