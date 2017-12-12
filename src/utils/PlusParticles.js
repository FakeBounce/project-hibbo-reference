// Fichier inutilisé -> Petits + autour de l'avatar de la Home

import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { bool } from 'prop-types';
import styled from 'styled-components/native';

import yellowPlus from 'assets/home/yellow-plus.png';
import purplePlus from 'assets/home/purple-plus.png';
import greenPlus from 'assets/home/green-plus.png';

const StyledParticlesView = styled.View`
  position: relative;
  z-index: 100;
  left: 150;
  top: 70;
`;

class PlusParticles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      particles: [],
    };

    this.initAnimationValues();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.switchParticles !== this.props.switchParticles &&
      nextProps.switchParticles
    ) {
      this.addWave(0, 15);

      Animated.delay(220).start(() => {
        this.addWave(16, 31);
        Animated.delay(1000).start(() => {
          this.setState({
            particles: [],
          });
          this.initAnimationValues();
        });
      });
    }
  }

  initAnimationValues() {
    this.particles = [
      {
        image: purplePlus,
        size: new Animated.Value(0.6),
        dx: 95,
        dy: -62.5,
        t: 30,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.6),
        dx: -78.5,
        dy: 116,
        t: 20,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.3),
        dx: -135,
        dy: 67,
        t: 150,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.3),
        dx: 31.5,
        dy: 112,
        t: 60,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.3),
        dx: 115,
        dy: 40.5,
        t: 150,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.5),
        dx: 126.5,
        dy: 94.5,
        t: 30,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.5),
        dx: -128,
        dy: 0,
        t: 80,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: -110.5,
        dy: -104,
        t: 50,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: 126.5,
        dy: -10.5,
        t: 140,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: 87.5,
        dy: -111,
        t: 50,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: -99.5,
        dy: 85,
        t: 130,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.7),
        dx: -45,
        dy: -108,
        t: 0,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: 81,
        dy: 106,
        t: 90,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: -121,
        dy: -57.5,
        t: 110,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: 38,
        dy: -118.5,
        t: 60,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: -20,
        dy: 135,
        t: 100,
      },

      {
        image: purplePlus,
        size: new Animated.Value(0.6),
        dx: 95,
        dy: -62.5,
        t: 30,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.6),
        dx: -78.5,
        dy: 116,
        t: 20,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.3),
        dx: -135,
        dy: 67,
        t: 150,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.3),
        dx: 31.5,
        dy: 112,
        t: 60,
      },
      {
        image: purplePlus,
        size: new Animated.Value(0.3),
        dx: 115,
        dy: 40.5,
        t: 150,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.5),
        dx: 126.5,
        dy: 94.5,
        t: 30,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.5),
        dx: -128,
        dy: 0,
        t: 80,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: -110.5,
        dy: -104,
        t: 50,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: 126.5,
        dy: -10.5,
        t: 140,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: 87.5,
        dy: -111,
        t: 50,
      },
      {
        image: greenPlus,
        size: new Animated.Value(0.3),
        dx: -99.5,
        dy: 85,
        t: 130,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.7),
        dx: -45,
        dy: -108,
        t: 0,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: 81,
        dy: 106,
        t: 90,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: -121,
        dy: -57.5,
        t: 110,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: 38,
        dy: -118.5,
        t: 60,
      },
      {
        image: yellowPlus,
        size: new Animated.Value(0.3),
        dx: -20,
        dy: 135,
        t: 100,
      },
    ];

    for (let i = 0; i < 32; i++) {
      this.particles[i].animatedValues = {
        opacity: new Animated.Value(1),
        translateX: new Animated.Value(0),
        translateY: new Animated.Value(0),
      };
    }
  }

  addWave(from, to) {
    const newParticles = this.particles.slice(from, to);

    newParticles.forEach(particle => {
      this.triggerAnimation(particle);
    });

    this.setState({
      particles: [...this.state.particles, ...newParticles],
    });
  }

  triggerAnimation(particle) {
    Animated.sequence([
      Animated.delay(particle.t),
      Animated.stagger(150, [
        Animated.parallel([
          Animated.timing(particle.animatedValues.translateX, {
            toValue: particle.dx,
            duration: 440,
            useNativeDriver: true,
          }),
          Animated.timing(particle.animatedValues.translateY, {
            toValue: particle.dy,
            duration: 440,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(particle.animatedValues.opacity, {
          toValue: 0,
          duration: 440,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }

  render() {
    const particles = this.state.particles.map((particle, index) => {
      return (
        <Animated.Image
          key={index}
          style={{
            position: 'absolute',
            width: 70,
            height: 70,
            left: 0,
            top: 0,
            opacity: particle.animatedValues.opacity,
            transform: [
              { translateX: particle.animatedValues.translateX },
              { translateY: particle.animatedValues.translateY },
              { scale: particle.size },
            ],
          }}
          source={particle.image}
        />
      );
    });

    return <StyledParticlesView>{particles}</StyledParticlesView>;
  }
}

PlusParticles.defaultProps = {
  switchParticles: false,
};

PlusParticles.propTypes = {
  switchParticles: bool,
};

export default PlusParticles;
